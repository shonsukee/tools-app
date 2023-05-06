//import "./LoginForm.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateUser from "../../api/postgre/user/CreateUser";
//import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";


interface LoginForm {
  name: string;
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
  });

  const onSubmit = async (data: LoginForm) => {
    console.log(data);
    //データベースサーバーのURL
    CreateUser(data);
    
  };

  return (
    <div className="form-container">
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">name</label>
        <input id="name" type="text" {...register("name")} />
        <p>{errors.name?.message as React.ReactNode}</p>
        <label htmlFor="email">email</label>
        <input id="email" type="email" {...register("email")} />
        <p>{errors.email?.message as React.ReactNode}</p>
        <label htmlFor="password">password</label>
        <input id="password" type="password" {...register("password")} />
        <p>{errors.password?.message as React.ReactNode}</p>
        <button className="btn btn-primary" type="submit">
          送信
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
