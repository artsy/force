import { FC, useState, useEffect } from "react"
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService"
import { Text, Input, Spacer, Button, Flex } from "@artsy/palette"
import { Media } from "Utils/Responsive"
import { validatePhoneNumber } from "Apps/Order/Utils/formValidators"

const google_key = "NOPE"

export const AddressAutoComplete: FC<{
  onContinueButtonPressed: (arg: any) => void
}> = ({ onContinueButtonPressed }) => {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
  } = usePlacesService({
    apiKey: google_key,
  })

  // TODO: better to model these into a single state property
  const [name, setName] = useState("")
  const [street, setStreet] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [phoneNumberError, setPhoneNumberError] = useState("")

  // the address user selects from predictions
  const [selectedAddress, setSelectedAddress] = useState<any>()
  const [showAddressPredictions, setShowAddressPredictions] = useState(false)

  const [isFormComplete, setIsFormComplete] = useState(false)

  useEffect(() => {
    // when address is selected, find relevant sections to populate inputs values
    if (selectedAddress?.length) {
      for (const addressSection of selectedAddress) {
        if (
          addressSection.types.includes("country") &&
          addressSection?.short_name
        ) {
          setCountry(addressSection.short_name)
        }

        if (
          addressSection.types.includes("postal_code") &&
          addressSection?.long_name
        ) {
          setPostalCode(addressSection.long_name)
        }
        if (
          (addressSection.types.includes("locality") ||
            addressSection.types.includes("sublocality_level_1")) &&
          addressSection.types.includes("political") &&
          addressSection?.long_name
        ) {
          setCity(addressSection.long_name)
        }
        if (
          addressSection.types.includes("administrative_area_level_1") &&
          addressSection.types.includes("political") &&
          addressSection?.short_name
        ) {
          setState(addressSection.short_name)
        }
        if (
          addressSection.types.includes("route") &&
          addressSection?.long_name
        ) {
          const streetNumber = selectedAddress.find(
            component =>
              component?.types.includes("street_number") && component?.long_name
          )

          if (streetNumber && streetNumber?.long_name) {
            setStreet(addressSection.long_name + " " + streetNumber.long_name)
          }
          setStreet(addressSection.long_name)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddress])

  useEffect(() => {
    if (
      name &&
      street &&
      postalCode &&
      city &&
      state &&
      country &&
      phoneNumber &&
      !phoneNumberError
    ) {
      setIsFormComplete(true)
    }
  }, [
    name,
    street,
    postalCode,
    city,
    state,
    country,
    phoneNumber,
    phoneNumberError,
  ])

  const validateAddress = addressDetails => {
    const regionCode =
      addressDetails.find(detail => detail.types.includes("country"))
        .short_name || ""

    const postalCode =
      addressDetails.find(detail => detail.types.includes("postal_code"))
        .long_name || ""

    const addressLines =
      addressDetails.find(detail => detail.types.includes("route")).long_name ||
      ""

    const locality =
      addressDetails.find(
        detail =>
          detail.types.includes("locality") &&
          detail.types.includes("political")
      ).long_name || ""

    const address = {
      regionCode,
      locality,
      addressLines,
      postalCode,
    }

    console.log({ XXXXX_add: address })

    fetch(
      `https://addressvalidation.googleapis.com/v1:validateAddress?key=${google_key}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: address,
        }),
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log("XXXXX_success:", data)
      })
      .catch(error => {
        console.error("XXXXX_err:", error)
      })
  }

  const handleAddressSelect = address => {
    setShowAddressPredictions(false)

    // get the details of selected address and set it to state
    if (address?.place_id) {
      placesService?.getDetails(
        {
          placeId: address.place_id,
        },
        placeDetails => {
          if (placeDetails?.address_components) {
            console.log({ XXXXX: placeDetails })
            validateAddress(placeDetails.address_components)
            setSelectedAddress(placeDetails.address_components)
          }
        }
      )
    }
  }

  return (
    <>
      <Spacer y={1} />
      <CustomInput
        title="Full Name"
        value={name}
        onChange={evt => setName(evt.target.value)}
      />
      <Spacer y={2} />
      {/* auto-complete input */}
      <Input
        required
        onFocus={() => setShowAddressPredictions(true)}
        title={"Address Line"}
        value={street}
        onChange={evt => {
          getPlacePredictions({ input: evt.target.value })
          setStreet(evt.target.value)
        }}
        style={{ height: 35 }}
      />

      {showAddressPredictions &&
        placePredictions.map(item => (
          <ul
            style={{
              backgroundColor: "#F9FBFB",
              borderLeft: "1px solid #cccdcf",
              borderRight: "1px solid #cccdcf",
              borderBottom: "1px solid #cccdcf",
              borderRadius: "3px",
              padding: 5,
              marginLeft: 15,
            }}
          >
            <li
              style={{
                marginLeft: 25,
                color: "#6C6D6D",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              <Text size="sm" onClick={() => handleAddressSelect(item)}>
                {item.description}
              </Text>
            </li>
          </ul>
        ))}
      <Spacer y={1} />

      <Flex>
        <CustomInput
          title="Postal Code"
          value={postalCode}
          onChange={evt => setPostalCode(evt.target.value)}
        />
        <Spacer x={2} />
        <CustomInput
          title="City"
          value={city}
          onChange={evt => setCity(evt.target.value)}
        />
      </Flex>
      <Spacer y={1} />
      <Flex>
        <CustomInput
          title="State"
          value={state}
          onChange={evt => setState(evt.target.value)}
        />
        <Spacer x={2} />
        <CustomInput
          title="Country"
          value={country}
          onChange={evt => setCountry(evt.target.value)}
        />
      </Flex>

      <Spacer y={1} />
      <CustomInput
        title="Phone number"
        value={phoneNumber}
        error={phoneNumberError || ""}
        onChange={evt => {
          const { error } = validatePhoneNumber(evt.target.value)

          setPhoneNumberError(error!)
          setPhoneNumber(evt.target.value)
        }}
      />
      <Spacer y={4} />
      <Media greaterThan="xs">
        <Button
          onClick={() => {
            const address = {
              name,
              street,
              postalCode,
              city,
              state,
              country,
              phoneNumber,
            }

            onContinueButtonPressed(address)
          }}
          variant="primaryBlack"
          width="50%"
          disabled={!isFormComplete}
        >
          Save and Continue
        </Button>
      </Media>
    </>
  )
}

const CustomInput: FC<{
  title: string
  value: string
  error?: string
  onChange: (arg: any) => void
}> = ({ title, value, error, onChange }) => {
  return (
    <Input
      style={{ height: 35 }}
      required
      title={title}
      value={value}
      error={error}
      onChange={onChange}
    />
  )
}
