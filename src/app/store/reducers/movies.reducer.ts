import * as actions from '../actions/index';
import * as models from '../../models';

// State Type
export interface MoviesState {
	data: { [id: number]: models.Movie };
	loading: boolean;
	error: string;
}

// Initial state
export const initialState: MoviesState = {
	data: {},
	loading: false,
	error: ''
};

// REDUCER
export function reducer(
	state = initialState,
	action: actions.MoviesActionTypes
): MoviesState {
	switch (action.type) {
		case actions.GET_MOVIES_BY_CATEGORY_ID: {
			return {
				...state,
				loading: true
			};
		}
		case actions.GET_MOVIES_BY_CATEGORY_ID_ERROR: {
			return {
				...state,
				loading: false,
				error: action.payload
			};
		}
		case actions.GET_MOVIES_BY_CATEGORY_ID_SUCCESS: {
			const entities = models.DictionaryUtils.toDictionnary<models.Movie>(action.payload);
			return {
				...state,
				loading: false,
				data: action.payload
			};
		}
	}

	return state;
}

// Sub selectors...
export const getMoviesLoading = (state: MoviesState) => state.loading;
export const getMovies = (state: MoviesState) => state.data;
