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
  username: string;
  password: string;
  email?: string;
  rollnumber?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
