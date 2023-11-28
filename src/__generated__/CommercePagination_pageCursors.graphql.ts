/**
 * @generated SignedSource<<6a8461fd6b24dd13ccae1ce8b179d469>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommercePagination_pageCursors$data = {
  readonly around: ReadonlyArray<{
    readonly cursor: string;
    readonly isCurrent: boolean;
    readonly page: number;
  }>;
  readonly first: {
    readonly cursor: string;
    readonly isCurrent: boolean;
    readonly page: number;
  } | null | undefined;
  readonly last: {
    readonly cursor: string;
    readonly isCurrent: boolean;
    readonly page: number;
  } | null | undefined;
  readonly previous: {
    readonly cursor: string;
    readonly page: number;
  } | null | undefined;
  readonly " $fragmentType": "CommercePagination_pageCursors";
};
export type CommercePagination_pageCursors$key = {
  readonly " $data"?: CommercePagination_pageCursors$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommercePagination_pageCursors">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v2 = [
  (v0/*: any*/),
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommercePagination_pageCursors",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CommercePageCursor",
      "kind": "LinkedField",
      "name": "around",
      "plural": true,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CommercePageCursor",
      "kind": "LinkedField",
      "name": "first",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CommercePageCursor",
      "kind": "LinkedField",
      "name": "last",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CommercePageCursor",
      "kind": "LinkedField",
      "name": "previous",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "CommercePageCursors",
  "abstractKey": null
};
})();

(node as any).hash = "2181d03885b5b67b99f99b1de535f5cb";

export default node;
