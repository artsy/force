/**
 * @generated SignedSource<<4cde11321f4d819b135a0499bcf459b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarSubMenuServer_navigationVersion$data = {
  readonly items: ReadonlyArray<{
    readonly children: ReadonlyArray<{
      readonly href: string | null | undefined;
      readonly position: number;
      readonly title: string;
    }>;
    readonly position: number;
    readonly title: string;
  }>;
  readonly " $fragmentType": "NavBarSubMenuServer_navigationVersion";
};
export type NavBarSubMenuServer_navigationVersion$key = {
  readonly " $data"?: NavBarSubMenuServer_navigationVersion$data;
  readonly " $fragmentSpreads": FragmentRefs<"NavBarSubMenuServer_navigationVersion">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NavBarSubMenuServer_navigationVersion",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "NavigationItem",
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "NavigationItem",
          "kind": "LinkedField",
          "name": "children",
          "plural": true,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "href",
              "storageKey": null
            },
            (v1/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "NavigationVersion",
  "abstractKey": null
};
})();

(node as any).hash = "6019fb78d3eaf0b0e3ee8c930ee9e8a7";

export default node;
