/**
 * @generated SignedSource<<518b97ae638e68022ca7f30a329fff2d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ArtworkAttributionClassType = "LIMITED_EDITION" | "OPEN_EDITION" | "UNIQUE" | "UNKNOWN_EDITION" | "%future added value";
export type MyCollectionUpdateArtworkInput = {
  artistIds?: ReadonlyArray<string | null> | null;
  artworkId: string;
  artworkLocation?: string | null;
  attributionClass?: ArtworkAttributionClassType | null;
  category?: string | null;
  clientMutationId?: string | null;
  collectorLocation?: EditableLocation | null;
  costCurrencyCode?: string | null;
  costMajor?: number | null;
  costMinor?: number | null;
  date?: string | null;
  depth?: string | null;
  editionNumber?: string | null;
  editionSize?: string | null;
  externalImageUrls?: ReadonlyArray<string | null> | null;
  height?: string | null;
  isEdition?: boolean | null;
  medium?: string | null;
  metric?: string | null;
  pricePaidCents?: any | null;
  pricePaidCurrency?: string | null;
  provenance?: string | null;
  submissionId?: string | null;
  title?: string | null;
  width?: string | null;
};
export type EditableLocation = {
  address?: string | null;
  address2?: string | null;
  city?: string | null;
  coordinates?: ReadonlyArray<number> | null;
  country?: string | null;
  countryCode?: string | null;
  postalCode?: string | null;
  state?: string | null;
  stateCode?: string | null;
  summary?: string | null;
};
export type useUpdateArtworkMutation$variables = {
  input: MyCollectionUpdateArtworkInput;
};
export type useUpdateArtworkMutation$data = {
  readonly myCollectionUpdateArtwork: {
    readonly artworkOrError: {
      readonly artwork?: {
        readonly images: ReadonlyArray<{
          readonly internalID: string | null;
        } | null> | null;
        readonly internalID: string;
      } | null;
      readonly mutationError?: {
        readonly message: string;
      } | null;
    } | null;
  } | null;
};
export type useUpdateArtworkMutation = {
  response: useUpdateArtworkMutation$data;
  variables: useUpdateArtworkMutation$variables;
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
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "includeAll",
      "value": true
    }
  ],
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "images",
  "plural": true,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": "images(includeAll:true)"
},
v4 = {
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
    "name": "useUpdateArtworkMutation",
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
                      (v2/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "MyCollectionArtworkMutationSuccess",
                "abstractKey": null
              },
              (v4/*: any*/)
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
    "name": "useUpdateArtworkMutation",
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
                      (v3/*: any*/),
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
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "78bfd0991b9cae521206bcebc2af90ba",
    "id": null,
    "metadata": {},
    "name": "useUpdateArtworkMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateArtworkMutation(\n  $input: MyCollectionUpdateArtworkInput!\n) {\n  myCollectionUpdateArtwork(input: $input) {\n    artworkOrError {\n      __typename\n      ... on MyCollectionArtworkMutationSuccess {\n        artwork {\n          internalID\n          images(includeAll: true) {\n            internalID\n          }\n          id\n        }\n      }\n      ... on MyCollectionArtworkMutationFailure {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "90dcdacc26b2ebaffb6ea29cfaeb1b98";

export default node;
