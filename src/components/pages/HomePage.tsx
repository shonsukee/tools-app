import React from "react";
import GenericTemplate from "../topsidebar/GenericTemplate1";
import { Masonry } from '@mui/lab'
import AppIcon from "../appIcon/AppIcon";


const HomePage: React.FC = () => {
  return (
    <GenericTemplate title="トップページ">
      <>トップページ内容</>
      <Masonry columns={4} spacing={2}>
        <AppIcon/>
      </Masonry>
    </GenericTemplate>
  );
};

export default HomePage;