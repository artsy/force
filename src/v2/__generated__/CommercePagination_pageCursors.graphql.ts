/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommercePagination_pageCursors = {
    readonly around: ReadonlyArray<{
        readonly cursor: string;
        readonly page: number;
        readonly isCurrent: boolean;
    }>;
    readonly first: {
        readonly cursor: string;
        readonly page: number;
        readonly isCurrent: boolean;
    } | null;
    readonly last: {
        readonly cursor: string;
        readonly page: number;
        readonly isCurrent: boolean;
    } | null;
    readonly previous: {
        readonly cursor: string;
        readonly page: number;
    } | null;
    readonly " $refType": "CommercePagination_pageCursors";
};
export type CommercePagination_pageCursors$data = CommercePagination_pageCursors;
export type CommercePagination_pageCursors$key = {
    readonly " $data"?: CommercePagination_pageCursors$data;
    readonly " $fragmentRefs": FragmentRefs<"CommercePagination_pageCursors">;
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
(node as any).hash = '2181d03885b5b67b99f99b1de535f5cb';
export default node;
