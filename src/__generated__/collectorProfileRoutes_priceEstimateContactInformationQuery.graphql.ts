/**
 * @generated SignedSource<<c54eb1eeb3b346b0a8ef776c93826e3c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type collectorProfileRoutes_priceEstimateContactInformationQuery$variables = {
  artworkID: string;
};
export type collectorProfileRoutes_priceEstimateContactInformationQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"PriceEstimateContactInformation_artwork">;
  } | null | undefined;
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"PriceEstimateContactInformation_me">;
  } | null | undefined;
};
export type collectorProfileRoutes_priceEstimateContactInformationQuery = {
  response: collectorProfileRoutes_priceEstimateContactInformationQuery$data;
  variables: collectorProfileRoutes_priceEstimateContactInformationQuery$variables;
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "collectorProfileRoutes_priceEstimateContactInformationQuery",
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
    "name": "collectorProfileRoutes_priceEstimateContactInformationQuery",
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
    "cacheID": "d1886e1ffbeed17217eb3a52f1243fb3",
    "id": null,
    "metadata": {},
    "name": "collectorProfileRoutes_priceEstimateContactInformationQuery",
    "operationKind": "query",
    "text": "query collectorProfileRoutes_priceEstimateContactInformationQuery(\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) @principalField {\n    ...PriceEstimateContactInformation_artwork\n    id\n  }\n  me {\n    ...PriceEstimateContactInformation_me\n    id\n  }\n}\n\nfragment ContactInformationForm_me on Me {\n  internalID\n  name\n  email\n  phone\n  phoneNumber {\n    regionCode\n  }\n}\n\nfragment PriceEstimateContactInformation_artwork on Artwork {\n  internalID\n  slug\n}\n\nfragment PriceEstimateContactInformation_me on Me {\n  internalID\n  name\n  email\n  phone\n  phoneNumber {\n    regionCode\n  }\n  ...ContactInformationForm_me\n}\n"
  }
};
})();

(node as any).hash = "c4f1a45f6848f966ee1c325b1b59a58f";

export default node;
