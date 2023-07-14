const axios = require("axios");

const queues = {};
const cache = {};

module.exports = async (query, callback) => {
  if (cache[query]) {
    console.log(`キャッシュ ${query} にヒットしました。`);
    return process.nextTick(callback.bind(null, null, cache[query]));
  }

  // 他のリクエストによってすでにキューに入っている場合は、自身のリクエストも同じキューに入れるだけ
  if (queues[query]) return queues[query].push(callback);

  queues[query] = [callback];

  try {
    const apiKey = process.env.REACT_APP_NEWS_API;
    const apiUrl = `https://gnews.io/api/v4/search?q=${query}&lang=ja&max=8&apikey=${apiKey}`;

    const headers = { "User-Agent": "bot" };
    const news = await axios.get(apiUrl, { headers: headers });
    // キューに入っている全ての callback 関数に計算結果を渡す
    queues[query].forEach((cb) => cb(null, news));

    // キューのクリア
    queues[query] = null;

    // キャッシュの保存
    cache[query] = news;

    // キャッシュの削除予約
    scheduleRemoveCache(query);

    return news;
  } catch (err) {
    console.error(err);
    console.log("Internal Server Error");
    return;
  }
};

function scheduleRemoveCache(query) {
  function deleteCache(query) {
    console.log(`キャッシュ ${query}: ${cache[query]} を削除します`);
    delete cache[query];
  }
  // 1日したらキャッシュを削除
  setTimeout(() => deleteCache(query), 24 * 60 * 60 * 1000);
}

// const redis = require("redis");

// const keys = require("../keys");

// let client = redis.createClient({
//   host: keys.redisHost,
//   port: keys.redisPort,
// });
// function GetNewsBatchHandler(req, res, next) {
//   client.post("posts", (err, reply) => {
//     if (err) res.status(500).send("Something went wrong");
//     if (reply !== null) {
//       res.send(reply);
//       console.log("from redis");
//     } else {
//       next();
//     }
//   });
// }

// module.exports = GetNewsBatchHandler;
