/**
 * @generated SignedSource<<6ac3bc0233eddbbcb8766f34981e1ac3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ArtworkAttributionClassType = "LIMITED_EDITION" | "OPEN_EDITION" | "UNIQUE" | "UNKNOWN_EDITION" | "%future added value";
export type ArtworkConditionEnumType = "EXCELLENT" | "FAIR" | "GOOD" | "VERY_GOOD" | "%future added value";
export type ArtworkSignatureTypeEnum = "HAND_SIGNED_BY_ARTIST" | "NOT_SIGNED" | "OTHER" | "SIGNED_IN_PLATE" | "STAMPED_BY_ARTIST_ESTATE" | "STICKER_LABEL" | "%future added value";
export type MyCollectionUpdateArtworkInput = {
  additionalInformation?: string | null | undefined;
  artistIds?: ReadonlyArray<string | null | undefined> | null | undefined;
  artworkId: string;
  artworkLocation?: string | null | undefined;
  attributionClass?: ArtworkAttributionClassType | null | undefined;
  category?: string | null | undefined;
  clientMutationId?: string | null | undefined;
  coaByAuthenticatingBody?: boolean | null | undefined;
  coaByGallery?: boolean | null | undefined;
  collectorLocation?: EditableLocation | null | undefined;
  condition?: ArtworkConditionEnumType | null | undefined;
  conditionDescription?: string | null | undefined;
  confidentialNotes?: string | null | undefined;
  costCurrencyCode?: string | null | undefined;
  costMajor?: number | null | undefined;
  costMinor?: number | null | undefined;
  date?: string | null | undefined;
  depth?: string | null | undefined;
  editionNumber?: string | null | undefined;
  editionSize?: string | null | undefined;
  externalImageUrls?: ReadonlyArray<string | null | undefined> | null | undefined;
  framedDepth?: string | null | undefined;
  framedHeight?: string | null | undefined;
  framedMetric?: string | null | undefined;
  framedWidth?: string | null | undefined;
  hasCertificateOfAuthenticity?: boolean | null | undefined;
  height?: string | null | undefined;
  isEdition?: boolean | null | undefined;
  isFramed?: boolean | null | undefined;
  medium?: string | null | undefined;
  metric?: string | null | undefined;
  pricePaidCents?: any | null | undefined;
  pricePaidCurrency?: string | null | undefined;
  provenance?: string | null | undefined;
  signatureDetails?: string | null | undefined;
  signatureTypes?: ReadonlyArray<ArtworkSignatureTypeEnum | null | undefined> | null | undefined;
  submissionId?: string | null | undefined;
  title?: string | null | undefined;
  width?: string | null | undefined;
};
export type EditableLocation = {
  address?: string | null | undefined;
  address2?: string | null | undefined;
  city?: string | null | undefined;
  coordinates?: ReadonlyArray<number> | null | undefined;
  country?: string | null | undefined;
  countryCode?: string | null | undefined;
  postalCode?: string | null | undefined;
  state?: string | null | undefined;
  stateCode?: string | null | undefined;
  summary?: string | null | undefined;
};
export type useUpdateMyCollectionArtworkMutation$variables = {
  input: MyCollectionUpdateArtworkInput;
};
export type useUpdateMyCollectionArtworkMutation$data = {
  readonly myCollectionUpdateArtwork: {
    readonly artworkOrError: {
      readonly artwork?: {
        readonly internalID: string;
      } | null | undefined;
      readonly mutationError?: {
        readonly message: string;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type useUpdateMyCollectionArtworkMutation = {
  response: useUpdateMyCollectionArtworkMutation$data;
  variables: useUpdateMyCollectionArtworkMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
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
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GravityMutationError",
      "kind": "LinkedField",
      "name": "mutationError",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MyCollectionArtworkMutationFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateMyCollectionArtworkMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MyCollectionUpdateArtworkPayload",
        "kind": "LinkedField",
        "name": "myCollectionUpdateArtwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "artworkOrError",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "artwork",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "MyCollectionArtworkMutationSuccess",
                "abstractKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateMyCollectionArtworkMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MyCollectionUpdateArtworkPayload",
        "kind": "LinkedField",
        "name": "myCollectionUpdateArtwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "artworkOrError",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
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
                        "name": "id",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "MyCollectionArtworkMutationSuccess",
                "abstractKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a9864aead9350d3ef76d9d7e5bfca28f",
    "id": null,
    "metadata": {},
    "name": "useUpdateMyCollectionArtworkMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateMyCollectionArtworkMutation(\n  $input: MyCollectionUpdateArtworkInput!\n) {\n  myCollectionUpdateArtwork(input: $input) {\n    artworkOrError {\n      __typename\n      ... on MyCollectionArtworkMutationSuccess {\n        artwork {\n          internalID\n          id\n        }\n      }\n      ... on MyCollectionArtworkMutationFailure {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5764375174cfa0bf705f960348549710";

export default node;
