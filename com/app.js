import action from "../redux/action";

console.log("app.js start");


export let tp = {
    view : {},      // view 컴포넌트
    action,         // action 객체
};

global.tp = tp;
