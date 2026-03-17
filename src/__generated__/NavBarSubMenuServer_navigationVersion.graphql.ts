/**
 * @generated SignedSource<<0525b18e6b776299337d95b5f06763bd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarSubMenuServer_navigationVersion$data = {
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

(node as any).hash = "2fcd647a283b3ac4b3aa8425fb257b5f";

export default node;
