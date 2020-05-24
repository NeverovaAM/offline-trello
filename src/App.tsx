import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { addBoard } from "./redux/basic/actions";
import { BoardType } from "./models";
import MainPage from "./components/containers/mainPage";
import BoardPage from './components/containers/boardPage';

type PropsType = {
  boards: BoardType[];
  addBoard: (title: string) => void;
};

function App(props: PropsType) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <MainPage></MainPage>
        </Route>
        <Route path="/board/:id">
          <BoardPage></BoardPage>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = (state: any) => {
  return {
    boards: state.basic.boards,
  };
};

export default connect(mapStateToProps, {
  addBoard,
})(App);
