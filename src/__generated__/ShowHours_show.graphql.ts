/**
 * @generated SignedSource<<1f299a7db06ca4f5b656eebd362903d5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowHours_show$data = {
  readonly fair: {
    readonly location: {
      readonly " $fragmentSpreads": FragmentRefs<"ShowLocationHours_location">;
    } | null | undefined;
  } | null | undefined;
  readonly location: {
    readonly " $fragmentSpreads": FragmentRefs<"ShowLocationHours_location">;
  } | null | undefined;
  readonly " $fragmentType": "ShowHours_show";
};
export type ShowHours_show$key = {
  readonly " $data"?: ShowHours_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowHours_show">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowLocationHours_location"
    }
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowHours_show",
  "selections": [
    (v0/*: any*/),
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
    }
  ],
  "type": "Show",
  "abstractKey": null
};
})();

(node as any).hash = "5363d4bdb2c7340cd83a379497c5b3c4";

export default node;
