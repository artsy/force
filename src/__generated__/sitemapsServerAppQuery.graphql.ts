/**
 * @generated SignedSource<<fff2265cfe5e2f748b8c281187a0e44d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type sitemapsServerAppQuery$variables = Record<PropertyKey, never>;
export type sitemapsServerAppQuery$data = {
  readonly seoExperimentArtists: ReadonlyArray<string | null | undefined> | null | undefined;
};
export type sitemapsServerAppQuery = {
  response: sitemapsServerAppQuery$data;
  variables: sitemapsServerAppQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "seoExperimentArtists",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "sitemapsServerAppQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "sitemapsServerAppQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "1843bb81a9756e9beb7d4c9d821412b0",
    "id": null,
    "metadata": {},
    "name": "sitemapsServerAppQuery",
    "operationKind": "query",
    "text": "query sitemapsServerAppQuery {\n  seoExperimentArtists\n}\n"
  }
};
})();

(node as any).hash = "76c7a53608f475c0484ffd4f61d925ff";

export default node;
