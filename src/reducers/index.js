import { combineReducers } from 'redux';
import SongsReducer from './reducer_songs';
/*
import UserReducer from './reducer_user';
import ValidateUserFieldsReducer from './reducer_validateUserFields';
import ResendEmailReducer from './reducer_resendEmail';
import UpdateEmailReducer from './reducer_updateEmail';
*/
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  /*
  user: UserReducer,
  validateFields: ValidateUserFieldsReducer,
  resendEmail: ResendEmailReducer,
  updateEmail: UpdateEmailReducer, 
  */
  form: formReducer, // <-- redux-form
  songs: SongsReducer, //<-- Posts
});

export default rootReducer;
