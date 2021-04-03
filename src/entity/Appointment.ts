export enum PetType {
  CAT = "CAT",
  DOG = "DOG"
}

export class Appointment {
  owner_name: string;
  pet_name: string;
  pet_type: PetType;
  description: string;
  active: boolean;
  employee_id: number;

  constructor(owner_name: string, pet_name: string, pet_type: PetType, description: string, active: boolean, employee_id: number) {
    this.owner_name = owner_name;
    this.pet_name = pet_name;
    this.pet_type = pet_type;
    this.description = description;
    this.active = active;
    this.employee_id = employee_id;
  }
}
