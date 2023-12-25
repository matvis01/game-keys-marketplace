import * as Yup from "yup"

export const gameListingSchema = Yup.object().shape({
  gameName: Yup.string().required("Game name is required"),
  gamePrice: Yup.number()
    .typeError("Game price must be a number")
    .required("Price is required"),
  gameKey: Yup.string()
    .matches(
      /^((?![^0-9]{12,}|[^A-z]{12,})([A-z0-9]{4,5}-?[A-z0-9]{4,5}-?[A-z0-9]{4,5}(-?[A-z0-9]{4,5}(-?[A-z0-9]{4,5})?)?))$/,
      "Wrong key format",
    )
    .required("Game key is required"),
})
