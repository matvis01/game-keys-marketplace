import * as Yup from "yup"

export const gameListingSchema = Yup.object().shape({
  gameName: Yup.string().required("Game name is required"),
  gamePrice: Yup.number()
    .typeError("Game price must be a number")
    .required("Price is required"),
  gameKey: Yup.string().required("Game key is required"),
})
