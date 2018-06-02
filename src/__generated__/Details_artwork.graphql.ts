/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type Details_artwork = {
    readonly href: string | null;
    readonly title: string | null;
    readonly date: string | null;
    readonly sale_message: string | null;
    readonly cultural_maker: string | null;
    readonly artists: ReadonlyArray<({
        readonly __id: string;
        readonly href: string | null;
        readonly name: string | null;
    }) | null> | null;
    readonly collecting_institution: string | null;
    readonly partner: ({
        readonly name: string | null;
        readonly href: string | null;
    }) | null;
    readonly sale: ({
        readonly is_auction: boolean | null;
        readonly is_live_open: boolean | null;
        readonly is_open: boolean | null;
        readonly is_closed: boolean | null;
    }) | null;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true,
    "type": "Boolean"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "Details_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    v0,
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "date",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "sale_message",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "cultural_maker",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artists",
      "storageKey": "artists(shallow:true)",
      "args": v1,
      "concreteType": "Artist",
      "plural": true,
      "selections": [
        v2,
        v0,
        v3
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "collecting_institution",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": "partner(shallow:true)",
      "args": v1,
      "concreteType": "Partner",
      "plural": false,
      "selections": [
        v3,
        v0,
        v2
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "sale",
      "storageKey": null,
      "args": null,
      "concreteType": "Sale",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "is_auction",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "is_live_open",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "is_open",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "is_closed",
          "args": null,
          "storageKey": null
        },
        v2
      ]
    },
    v2
  ]
};
})();
(node as any).hash = '46676bc3e081aefe4bcdb6ea73308dc0';
export default node;
