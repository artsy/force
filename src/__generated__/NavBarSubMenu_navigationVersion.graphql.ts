/**
 * @generated SignedSource<<c5c6239b08ba973cc25513431bd0e915>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarSubMenu_navigationVersion$data = {
  readonly featuredLinksSet: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMenuItemFeaturedLinkColumn_featuredLinkData">;
  } | null | undefined> | null | undefined;
  readonly items: ReadonlyArray<{
    readonly children: ReadonlyArray<{
      readonly href: string | null | undefined;
      readonly position: number;
      readonly title: string;
    }>;
    readonly position: number;
    readonly title: string;
  }>;
  readonly " $fragmentType": "NavBarSubMenu_navigationVersion";
};
export type NavBarSubMenu_navigationVersion$key = {
  readonly " $data"?: NavBarSubMenu_navigationVersion$data;
  readonly " $fragmentSpreads": FragmentRefs<"NavBarSubMenu_navigationVersion">;
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
  "name": "NavBarSubMenu_navigationVersion",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FeaturedLink",
      "kind": "LinkedField",
      "name": "featuredLinksSet",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "NavBarMenuItemFeaturedLinkColumn_featuredLinkData"
        }
      ],
      "storageKey": null
    },
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

(node as any).hash = "85046c58a4e3affe397732484b76f83c";

export default node;
