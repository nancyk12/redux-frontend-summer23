const checker = (key, value) => {
    switch (key) {
        // case 'firstname':
            
        //     return {
        //         error: false,
        //         message: ''
        //     };

        default:
            return {error: false, message: 'Hello'}
    }
}

export const registrationValidator = (userObj) => {
    // console.log(userObj)
    let validObj = {}
    for (const key in userObj) {
        const element = userObj[key];
        validObj = {
            ...validObj,
            [key]: checker(key, element)
            //function that takes in the userObj key value pair, and returns error and message
        }
    }
    

    // return an obj with the validation errors.
    // return  {
    //          firstname: {
    //                     error: true,
    //                     message: 'Firstname cannot be false'    
    //                         }
    //          }
    
    return validObj
}