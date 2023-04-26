import React from "react";
import GenericTemplate from "../topsidebar/GenericTemplate";
import { Masonry } from '@mui/lab'


const HomePage: React.FC = () => {
  return (
    <GenericTemplate title="トップページ">
      <>トップページ内容</>
      <Masonry columns={4} spacing={2}>
        
      </Masonry>
    </GenericTemplate>
  );
};

export default HomePage;