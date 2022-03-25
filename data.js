const API = "http://localhost:3000/restaurants"

let restaurants;//saves the eventual data to this variable which will then get get exported later

async function getJSON(response) {
  if (response.ok) { // if the resonse didn't fail and is ok
    const data = await response.json();// wait for the json data
    return Promise.resolve(data);// return the json data with a resolved promise
  }
// if code above doesn't run/ if the promise IS NOT relsoved then the cod ebelow is run
  const { status, statusText } = response;
  const error = new Error(`${status} ${statusText}`);// this will give the values of the built in status text

  return Promise.reject(error);
}

try {// the code that might throw an error is written inside the try block
  const response = await fetch(API);//this sends us back a response object //this await syntax can only be done in native modules
  restaurants = await getJSON(response);//parsing the response object received from line above in the getJSON object
  //^this then gives back real data as an object
} catch (error) {// inside the catch block you get access to the error
  restaurants = error;
}

export default restaurants; // data is exported