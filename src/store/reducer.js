const initialData = {count : 0}

const counter = (state = initialData, action) => {

    switch(action.type) {

         case "INC":

         return {

             ...state, count : state.count + action.payload
         }

         default:

         return state;
    }
}

export default counter;