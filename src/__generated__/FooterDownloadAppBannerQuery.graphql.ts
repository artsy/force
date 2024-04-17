/**
 * @generated SignedSource<<c09ca8f4264756396799024e9002e33e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type FooterDownloadAppBannerQuery$variables = {
  slug: string;
};
export type FooterDownloadAppBannerQuery$data = {
  readonly artwork: {
    readonly isUnlisted: boolean;
  } | null | undefined;
};
export type FooterDownloadAppBannerQuery = {
  response: FooterDownloadAppBannerQuery$data;
  variables: FooterDownloadAppBannerQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isUnlisted",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FooterDownloadAppBannerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FooterDownloadAppBannerQuery",
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bc1f4cd964ef1b5dd48a390965955300",
    "id": null,
    "metadata": {},
    "name": "FooterDownloadAppBannerQuery",
    "operationKind": "query",
    "text": "query FooterDownloadAppBannerQuery(\n  $slug: String!\n) {\n  artwork(id: $slug) {\n    isUnlisted\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "34ddb3bfac66f99fe70b65079cd5d7b7";

export default node;
