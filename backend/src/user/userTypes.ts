enum Role {
  student = "student",
  coremember = "coremember",
  director = "director",
  hod = "hod",
  admin = "admin",
}

export interface User {
  _id: string;
  name: string;
  email: string;
  rollnumber: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
