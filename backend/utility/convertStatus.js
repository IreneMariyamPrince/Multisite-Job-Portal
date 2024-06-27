/* eslint-env es6 */
// Function to convert userStatus to corresponding string
const convertUserStatus=(status) =>{
    switch (status) {
      case '1':
        return 'Active';
      case '2':
        return 'Pending';
      default:
        return status; // Return original status if not matched
    }
  }

module.exports={convertUserStatus}