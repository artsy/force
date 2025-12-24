/**
 * @generated SignedSource<<11ad138e33d95e1d6b1b2e5e5bcf3337>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RequestConditionReportJestQuery$variables = Record<PropertyKey, never>;
export type RequestConditionReportJestQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"RequestConditionReport_artwork">;
  } | null | undefined;
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"RequestConditionReport_me">;
  } | null | undefined;
};
export type RequestConditionReportJestQuery$rawResponse = {
  readonly artwork: {
    readonly id: string;
    readonly image: {
      readonly aspectRatio: number;
      readonly url: string | null | undefined;
    } | null | undefined;
    readonly internalID: string;
    readonly saleArtwork: {
      readonly id: string;
      readonly internalID: string;
    } | null | undefined;
    readonly slug: string;
  } | null | undefined;
  readonly me: {
    readonly email: string | null | undefined;
    readonly id: string;
    readonly internalID: string;
  } | null | undefined;
};
export type RequestConditionReportJestQuery = {
  rawResponse: RequestConditionReportJestQuery$rawResponse;
  response: RequestConditionReportJestQuery$data;
  variables: RequestConditionReportJestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "artwork-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RequestConditionReportJestQuery",
    "selections": [
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
            "name": "RequestConditionReport_me"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "RequestConditionReport_artwork"
          }
        ],
        "storageKey": "artwork(id:\"artwork-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RequestConditionReportJestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "x-large"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"x-large\")"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "aspectRatio",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"artwork-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "f6eac56b780a4d68e25e95eddf4129ff",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.id": (v3/*: any*/),
        "artwork.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artwork.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "artwork.image.url": (v4/*: any*/),
        "artwork.internalID": (v3/*: any*/),
        "artwork.saleArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "artwork.saleArtwork.id": (v3/*: any*/),
        "artwork.saleArtwork.internalID": (v3/*: any*/),
        "artwork.slug": (v3/*: any*/),
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.email": (v4/*: any*/),
        "me.id": (v3/*: any*/),
        "me.internalID": (v3/*: any*/)
      }
    },
    "name": "RequestConditionReportJestQuery",
    "operationKind": "query",
    "text": "query RequestConditionReportJestQuery {\n  me {\n    ...RequestConditionReport_me\n    id\n  }\n  artwork(id: \"artwork-id\") {\n    ...RequestConditionReport_artwork\n    id\n  }\n}\n\nfragment RequestConditionReport_artwork on Artwork {\n  internalID\n  slug\n  saleArtwork {\n    internalID\n    id\n  }\n  image {\n    url(version: \"x-large\")\n    aspectRatio\n  }\n}\n\nfragment RequestConditionReport_me on Me {\n  email\n  internalID\n}\n"
  }
};
})();

(node as any).hash = "562a027c0d1282fb053a89acc302118e";

export default node;
