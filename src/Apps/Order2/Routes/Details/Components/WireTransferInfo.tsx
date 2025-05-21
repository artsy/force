import { Box, Spacer, Stack, Text } from "@artsy/palette"

interface BankDetails {
  accountNumber: string
  iban?: string
  routingNumber?: string
  swift: string
  sortCode?: string
  bankAddress: {
    name: string
    street1: string
    street2?: string
    city: string
    country: string
  }
  intermediaryBank?: {
    name: string
    swift: string
  }
}

const BANK_DETAILS: Record<string, BankDetails> = {
  GBP: {
    accountNumber: "88005417",
    iban: "GB30PNBP16567188005417",
    swift: "PNBPGB2L",
    sortCode: "16-56-7",
    bankAddress: {
      name: "Wells Fargo Bank, N.A. London Branch",
      street1: "1 Plantation Place",
      street2: "30 Fenchurch Street",
      city: "London, United Kingdom, EC3M 3BD",
      country: "United Kingdom",
    },
    intermediaryBank: {
      name: "ING Brussels",
      swift: "NWBKGB2LXXX",
    },
  },
  EUR: {
    accountNumber: "88005419",
    iban: "GB73PNBP16567188005419",
    swift: "PNBPGB2L",
    bankAddress: {
      name: "Wells Fargo Bank, N.A. London Branch",
      street1: "1 Plantation Place",
      street2: "30 Fenchurch Street",
      city: "London, United Kingdom, EC3M 3BD",
      country: "United Kingdom",
    },
    intermediaryBank: {
      name: "ING Brussels",
      swift: "BBRUBEBB010",
    },
  },
  USD: {
    accountNumber: "4243851425",
    routingNumber: "121000248",
    swift: "WFBIUS6S",
    bankAddress: {
      name: "Wells Fargo Bank, N.A.",
      street1: "420 Montgomery Street",
      city: "San Francisco, CA 94104",
      country: "United States",
    },
    intermediaryBank: {
      name: "ING Brussels",
      swift: "PNBPUS3NNYC",
    },
  },
}

interface WireTransferInfoProps {
  order: {
    currencyCode?: string
    code: string
  }
}

export const WireTransferInfo: React.FC<WireTransferInfoProps> = ({
  order,
}) => {
  const currencyCode = order.currencyCode || "USD"
  const details = BANK_DETAILS[currencyCode] || BANK_DETAILS.USD

  return (
    <Box border="1px solid" borderColor="mono15" p={2}>
      <Text variant="sm" fontWeight="bold">
        Send wire transfer to
      </Text>
      <Spacer y={1} />
      <Stack gap={0}>
        <Text variant="sm">Account name: Art.sy Inc.</Text>
        {details.iban && <Text variant="sm">IBAN: {details.iban}</Text>}
        {details.routingNumber && (
          <Text variant="sm">Routing number: {details.routingNumber}</Text>
        )}
        <Text variant="sm">International SWIFT: {details.swift}</Text>
        {details.sortCode && (
          <Text variant="sm">Sort Code: {details.sortCode}</Text>
        )}
      </Stack>
      <Text variant="sm">
        {details.sortCode && (
          <>
            <br />
            Sort Code: {details.sortCode}
          </>
        )}
      </Text>
      <Spacer y={4} />
      <Text variant="sm" fontWeight="bold">
        Bank address
      </Text>
      <Spacer y={1} />
      <Stack gap={0}>
        <Text variant="sm">{details.bankAddress.name}</Text>
        <Text variant="sm">{details.bankAddress.street1}</Text>
        {details.bankAddress.street2 && (
          <Text variant="sm">{details.bankAddress.street2}</Text>
        )}
        <Text variant="sm">{details.bankAddress.city}</Text>
      </Stack>
      <Spacer y={4} />
      <Text variant="sm" fontWeight="bold">
        Add order #{order.code} to the notes section in your wire transfer.
      </Text>
      <Spacer y={1} />
      <Text variant="sm">
        If your bank account is not in {currencyCode}, please reference Artsy's
        intermediary bank {details.intermediaryBank?.name} (Intermediary Bank
        BIC/SWIFT:
        {details.intermediaryBank?.swift}) along with Artsy's international
        SWIFT ({details.swift}) when making payment. Ask your bank for further
        instructions.
      </Text>
    </Box>
  )
}
