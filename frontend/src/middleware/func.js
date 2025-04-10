const func = ({dispatch}) => (next) => (action) => {
  if(typeof action == "function"){
    action(dispatch);
    next()
  }
  else{
    next()
  }
};

export default func;

