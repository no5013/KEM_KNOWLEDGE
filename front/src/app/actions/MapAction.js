import { Action } from '../constants';
import { CALL_API } from 'redux-api-middleware';
import { GMAP_API } from '../constants/endpoints';
import {loadRice} from './RiceAction'
export const loadLocation = (lat,lon) => (
  (dispatch) =>
    dispatch({
      [CALL_API]: {
        endpoint: GMAP_API+'json?latlng='+lat+','+lon+'&key=AIzaSyAcL8ck1UsGTyczVjAMt01GQQhOusR-Q7A',
        headers: {
          'Accept': 'application/json',
        },
        method: 'GET',
        types: [
          'LOAD_LOCATION_REQUEST',
          {
            type: 'LOAD_LOCATION_SUCCESS',
            payload: (_action, _state, res) => {
              return res.json().then((data) => {
                data.lat = lat
                data.lng = lon
                console.log(data);
                let rice_data = {
                  province : data.results[1].address_components[2].long_name.toLowerCase().split(' ').join('')
                }
                dispatch(loadRice(rice_data))
                return data
              })
            }
          },
          'LOAD_LOCATION_FAILURE'
        ]
      }
    }
  )
)
