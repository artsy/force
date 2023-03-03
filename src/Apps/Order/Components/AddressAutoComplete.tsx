import { FC, useState, useEffect } from "react"
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService"
import { Text, Input, Spacer } from "@artsy/palette"

export const AddressAutoComplete: FC = () => {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
  } = usePlacesService({
    // apiKey: "API_KEY_PLACEHOLDER",
  })

  // TODO: better to model these into a single state property
  const [name, setName] = useState("")
  const [street, setStreet] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")

  // the address user selects from predictions
  const [selectedAddress, setSelectedAddress] = useState<any>()
  const [showAddressPredictions, setShowAddressPredictions] = useState(false)

  useEffect(() => {
    // when address is selected, find relevant sections to populate inputs values
    if (selectedAddress?.length) {
      for (const addressSection of selectedAddress) {
        if (
          addressSection.types.includes("country") &&
          addressSection?.long_name
        ) {
          setCountry(addressSection.long_name)
        }

        if (
          addressSection.types.includes("postal_code") &&
          addressSection?.long_name
        ) {
          setPostalCode(addressSection.long_name)
        }
        if (
          addressSection.types.includes("administrative_area_level_1") &&
          addressSection?.long_name
        ) {
          setCity(addressSection.long_name)
        }
        if (
          addressSection.types.includes("locality") &&
          addressSection.types.includes("political") &&
          addressSection?.long_name
        ) {
          setState(addressSection.long_name)
        }
        if (
          addressSection.types.includes("route") &&
          addressSection?.long_name
        ) {
          const streetNumber = selectedAddress.find(
            component =>
              component?.types.includes("street_number") && component?.long_name
          )
          setStreet(addressSection.long_name + " " + streetNumber.long_name)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddress])

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
        style={{
          backgroundColor: "#F9FBFB",
          border: "1px solid #cccdcf",
          borderRadius: "3px",
        }}
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
      <CustomInput
        title="Postal Code"
        value={postalCode}
        onChange={evt => setPostalCode(evt.target.value)}
      />
      <Spacer y={1} />
      <CustomInput
        title="City"
        value={city}
        onChange={evt => setCity(evt.target.value)}
      />
      <Spacer y={1} />
      <CustomInput
        title="State"
        value={state}
        onChange={evt => setState(evt.target.value)}
      />
      <Spacer y={1} />
      <CustomInput
        title="Country"
        value={country}
        onChange={evt => setCountry(evt.target.value)}
      />
      <Spacer y={1} />
    </>
  )
}

const CustomInput: FC<{
  title: string
  value: string
  onChange: (arg: any) => void
}> = ({ title, value, onChange }) => {
  return (
    <Input
      required
      title={title}
      value={value}
      onChange={onChange}
      style={{
        backgroundColor: "#F9FBFB",
        border: "1px solid #cccdcf",
        borderRadius: "3px",
      }}
    />
  )
}
