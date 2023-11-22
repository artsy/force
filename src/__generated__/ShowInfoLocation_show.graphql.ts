/**
 * @generated SignedSource<<22ab3e6724219cb34d20bf0d6921245e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowInfoLocation_show$data = {
  readonly fair: {
    readonly location: {
      readonly address: string | null | undefined;
      readonly address2: string | null | undefined;
      readonly city: string | null | undefined;
      readonly country: string | null | undefined;
      readonly display: string | null | undefined;
      readonly state: string | null | undefined;
      readonly summary: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly location: {
    readonly address: string | null | undefined;
    readonly address2: string | null | undefined;
    readonly city: string | null | undefined;
    readonly country: string | null | undefined;
    readonly display: string | null | undefined;
    readonly state: string | null | undefined;
    readonly summary: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ShowInfoLocation_show";
};
export type ShowInfoLocation_show$key = {
  readonly " $data"?: ShowInfoLocation_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowInfoLocation_show">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "concreteType": "Location",
  "kind": "LinkedField",
  "name": "location",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "display",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "address",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "address2",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "city",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "country",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "summary",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowInfoLocation_show",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Fair",
      "kind": "LinkedField",
      "name": "fair",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    (v0/*: any*/)
  ],
  "type": "Show",
  "abstractKey": null
};
})();

(node as any).hash = "85703778e703310bfac0d88513c68778";

export default node;
