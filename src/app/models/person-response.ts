export interface PersonResponse {
  userId: number;
  person: {
    personId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
  };
  profile: string;
  userCode: string;
  eUserStatus: string;
}
