import {PetType} from "../entity/Appointment";

export const appointmentSchema = {
  $id: "appointment",
  type: "object",
  required: ["owner_name", "pet_name", "pet_type", "description"],
  properties: {
    owner_name: {
      type: "string"
    },
    pet_name: {
      type: "string"
    },
    pet_type: {
      type: "string",
      enum: [PetType.CAT, PetType.DOG]
    }
  }
}
