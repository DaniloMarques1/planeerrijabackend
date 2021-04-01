export enum PetType {
  CAT,
  DOG
}

export class Appointment {
  owner_name: string;
  pet_name: string;
  pet_type: PetType;
  description: string;

  constructor(owner_name: string, pet_name: string, pet_type: PetType, description: string) {
    this.owner_name = owner_name;
    this.pet_name = pet_name;
    this.pet_type = pet_type;
    this.description = description;
  }
}
