/**
 * @generated SignedSource<<f60b21f069b4376b4cfa836a46666db1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileSubMenuServer_navigationVersion$data = {
  readonly items: ReadonlyArray<{
    readonly children: ReadonlyArray<{
      readonly href: string | null | undefined;
      readonly position: number;
      readonly title: string;
    }>;
    readonly position: number;
    readonly title: string;
  }>;
  readonly " $fragmentType": "NavBarMobileSubMenuServer_navigationVersion";
};
export type NavBarMobileSubMenuServer_navigationVersion$key = {
  readonly " $data"?: NavBarMobileSubMenuServer_navigationVersion$data;
  readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileSubMenuServer_navigationVersion">;
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
  "name": "NavBarMobileSubMenuServer_navigationVersion",
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

(node as any).hash = "eb73eab8e1be567aee3dff9ffab53c82";

export default node;
