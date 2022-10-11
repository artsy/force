/**
 * @generated SignedSource<<67785798e7f94a66d40f9ae495b8d4f1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceEstimateContactInformation_ArtworkFlowTest_Query$variables = {
  artworkID: string;
};
export type PriceEstimateContactInformation_ArtworkFlowTest_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"PriceEstimateContactInformation_artwork">;
  } | null;
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"PriceEstimateContactInformation_me">;
  } | null;
};
export type PriceEstimateContactInformation_ArtworkFlowTest_Query = {
  response: PriceEstimateContactInformation_ArtworkFlowTest_Query$data;
  variables: PriceEstimateContactInformation_ArtworkFlowTest_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artworkID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PriceEstimateContactInformation_ArtworkFlowTest_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PriceEstimateContactInformation_artwork"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PriceEstimateContactInformation_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PriceEstimateContactInformation_ArtworkFlowTest_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "phone",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PhoneNumberType",
            "kind": "LinkedField",
            "name": "phoneNumber",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isValid",
                "storageKey": null
              },
              {
                "alias": "international",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "INTERNATIONAL"
                  }
                ],
                "kind": "ScalarField",
                "name": "display",
                "storageKey": "display(format:\"INTERNATIONAL\")"
              },
              {
                "alias": "national",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "NATIONAL"
                  }
                ],
                "kind": "ScalarField",
                "name": "display",
                "storageKey": "display(format:\"NATIONAL\")"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "regionCode",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2c8f77ad467fe1b0b5b10422a31b945e",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.id": (v4/*: any*/),
        "artwork.internalID": (v4/*: any*/),
        "artwork.slug": (v4/*: any*/),
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.email": (v5/*: any*/),
        "me.id": (v4/*: any*/),
        "me.internalID": (v4/*: any*/),
        "me.name": (v5/*: any*/),
        "me.phone": (v5/*: any*/),
        "me.phoneNumber": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PhoneNumberType"
        },
        "me.phoneNumber.international": (v5/*: any*/),
        "me.phoneNumber.isValid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "me.phoneNumber.national": (v5/*: any*/),
        "me.phoneNumber.regionCode": (v5/*: any*/)
      }
    },
    "name": "PriceEstimateContactInformation_ArtworkFlowTest_Query",
    "operationKind": "query",
    "text": "query PriceEstimateContactInformation_ArtworkFlowTest_Query(\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) @principalField {\n    ...PriceEstimateContactInformation_artwork\n    id\n  }\n  me {\n    ...PriceEstimateContactInformation_me\n    id\n  }\n}\n\nfragment ContactInformationForm_me on Me {\n  internalID\n  name\n  email\n  phone\n  phoneNumber {\n    isValid\n    international: display(format: INTERNATIONAL)\n    national: display(format: NATIONAL)\n    regionCode\n  }\n}\n\nfragment PriceEstimateContactInformation_artwork on Artwork {\n  internalID\n  slug\n}\n\nfragment PriceEstimateContactInformation_me on Me {\n  internalID\n  name\n  email\n  phone\n  phoneNumber {\n    isValid\n    international: display(format: INTERNATIONAL)\n    national: display(format: NATIONAL)\n    regionCode\n  }\n  ...ContactInformationForm_me\n}\n"
  }
};
})();

(node as any).hash = "526ffbaa20faf7d7f48226b84cb27b84";

export default node;
