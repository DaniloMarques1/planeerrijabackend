export enum PetType {
  CAT = "CAT",
  DOG = "DOG"
}

export class Appointment {
	id: number;
  owner_name: string;
  pet_name: string;
  pet_type: PetType;
  description: string;
  active: boolean;
  consult_created_date: Date;
  consult_over_date: Date;
  employee_id: number;
}
