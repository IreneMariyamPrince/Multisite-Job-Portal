export const UserStatus = status => {
  switch (status) {
    case 1:
      return 'Active';
    case 2:
      return 'Pending';
    default:
      return 'unknown';
  }
};

export const regionWebInfoStatus = status => {
  switch (status) {
    case '1':
      return 'Active';
    case '2':
      return 'Email Sent';
    case '3':
      return 'In Progress';
    case '4':
      return 'Pending';
    case '5':
      return 'Rejected';
    default:
      return 'None';
  }
};

export const JobStatus = status => {
  switch (status) {
    case 1:
      return 'Active';
    case 2:
      return 'Pending';
    case 3:
      return 'Expired';
    default:
      return 'unknown';
  }
};
