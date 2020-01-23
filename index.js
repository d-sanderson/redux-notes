const redux = require('redux');

//  Three core concepts in REDUX

//  Store - Holds the state of your application.

//  Action - How you want to change state (Describes the state change)

//  Reducer - Ties the store and actions together

// First Principle:
//  The state of your whole application is stored in an object tree within a single store.

// The only way to change the state is to emit an action, an object describing what happned
// To update the state of your app, you need to let Redux know about that with an action
// You CANNOT update the state directly, to change state you must emit an action describing the desired state change.

//Third Principle:
// To specify how the state tree is transformed by action, you write pure reducers

// If the app needs to change state it dispatches an action

// Reducer handles action and updates current state in the Store which passes it back to the app.

// Cake Shop Example
// state - numCakes << managed by Redux Store.
// to change numCakes you must dispatch an action to a reducer which updates the Store.
// state is read only, the only way to change it is to emit(dispatch) an action and update the state.
// state can only be transformed by emitting actions.

// action is an obj with a type property

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const BUY_CAKE = 'BUY_CAKE';
//action creator - function that returns an action obj
function buyCake() {
  return {
    // action
    type: BUY_CAKE,
    info: 'first redux action',
  };
}

const STOCK_CAKES = 'STOCK_CAKES';
//action creator - function that returns an action obj
function stockCakes() {
  return {
    // action
    type: STOCK_CAKES,
    info: '2nd redux action',
  };
}
// next up implement the reducer
STOCK_ICECREAM = 'STOCK_ICECREAM';

function stockIcecream() {
  return {
    // action
    type: STOCK_ICECREAM,
    info: '3rd redux action',
  };
}
// (prevState, action) => newState
const initialCakeState = {
  numCakes: 10,
};

const initialIceCreamState = {
  iceCream: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numCakes: state.numCakes - 1,
      };
    case STOCK_CAKES:
      return {
        ...state,
        numCakes: state.numCakes + 10,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case STOCK_ICECREAM:
      return {
        ...state,
        iceCream: state.iceCream + 10,
      };
    default:
      return state;
  }
};

// How do you handle more than one reducer? combineReducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
});

const store = createStore(rootReducer);

// The Store brings the actions and reducer together
// One store for the entire app.
// Responsibilities
// Holds state
// Allows access w getState()
console.log('init state', store.getState());

// Registers listeners w subscribe(listener)

const unsubscribe = store.subscribe(() =>
  console.log('updated store', store.getState())
);
// Allows state to be update w dispatch(action)]
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(stockCakes());
store.dispatch(stockIcecream());
// unsubscribe is rly important
// Handles unregistering of listeners via the function return by subscribe(listener)
unsubscribe();
