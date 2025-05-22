import { Box, Spacer, Stack, Text } from "@artsy/palette"

interface BankDetails {
  transferInfo: string[]
  bankAddress: string[]
  referenceInfo: {
    intermediary: string
    international: string
  }
}

const BANK_DETAILS: Record<string, BankDetails> = {
  GBP: {
    transferInfo: [
      "Account name: Art.sy Inc",
      "Account number: 88005417",
      "IBAN: GB30PNBP16567188005417",
      "International SWIFT: PNBPGB2L",
      "Sort Code: 16-56-7",
    ],
    bankAddress: [
      "Wells Fargo Bank, N.A. London Branch",
      "1 Plantation Place",
      "30 Fenchurch Street",
      "London, United Kingdom, EC3M 3BD",
    ],
    referenceInfo: {
      intermediary: "NWBKGB2LXXX",
      international: "PNBPGB2L",
    },
  },
  EUR: {
    transferInfo: [
      "Account name: Art.sy Inc",
      "Account number: 88005419",
      "IBAN: GB73PNBP16567188005419",
      "International SWIFT: PNBPGB2L",
    ],
    bankAddress: [
      "Wells Fargo Bank, N.A. London Branch",
      "1 Plantation Place",
      "30 Fenchurch Street",
      "London, United Kingdom, EC3M 3BD",
    ],
    referenceInfo: {
      intermediary: "BBRUBEBB010",
      international: "PNBPGB2L",
    },
  },
  USD: {
    transferInfo: [
      "Account name: Art.sy Inc",
      "Account number: 4243851425",
      "Routing number: 121000248",
      "International SWIFT: WFBIUS6S",
    ],
    bankAddress: [
      "Wells Fargo Bank, N.A.",
      "420 Montgomery Street",
      "San Francisco, CA 94104",
      "United States",
    ],
    referenceInfo: {
      intermediary: "PNBPUS3NNYC",
      international: "WFBIUS6S",
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
      <Stack gap={0} mt={1} mb={4}>
        {details.transferInfo.map(rowText => (
          <Text variant="sm">{rowText}</Text>
        ))}
      </Stack>
      <Text variant="sm" fontWeight="bold">
        Bank address
      </Text>
      <Stack gap={0} mt={1} mb={4}>
        {details.bankAddress.map(rowText => (
          <Text variant="sm">{rowText}</Text>
        ))}
      </Stack>
      <Text variant="sm" fontWeight="bold">
        Add order #{order.code} to the notes section in your wire transfer.
      </Text>
      <Spacer y={1} />
      <Text variant="sm">
        If your bank account is not in {currencyCode}, please reference Artsy's
        intermediary bank ING Brussels (Intermediary Bank BIC/SWIFT:{" "}
        {details.referenceInfo.intermediary}) along with Artsy's international
        SWIFT ({details.referenceInfo.international}) when making payment. Ask
        your bank for further instructions.
      </Text>
    </Box>
  )
}
