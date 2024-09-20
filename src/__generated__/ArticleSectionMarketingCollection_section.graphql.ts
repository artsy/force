/**
 * @generated SignedSource<<965d7a409bdb889197734025cbec3e74>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleSectionMarketingCollection_section$data = {
  readonly collection: {
    readonly artworksConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly href: string | null | undefined;
          readonly internalID: string;
          readonly slug: string;
          readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly title: string;
  } | null | undefined;
  readonly slug: string | null | undefined;
  readonly " $fragmentType": "ArticleSectionMarketingCollection_section";
};
export type ArticleSectionMarketingCollection_section$key = {
  readonly " $data"?: ArticleSectionMarketingCollection_section$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSectionMarketingCollection_section">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSectionMarketingCollection_section",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "MarketingCollection",
      "kind": "LinkedField",
      "name": "collection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 20
            }
          ],
          "concreteType": "FilterArtworksConnection",
          "kind": "LinkedField",
          "name": "artworksConnection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "FilterArtworksEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "internalID",
                      "storageKey": null
                    },
                    (v0/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "href",
                      "storageKey": null
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "ShelfArtwork_artwork"
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "artworksConnection(first:20)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArticleSectionCollection",
  "abstractKey": null
};
})();

(node as any).hash = "d933a48a3190fad3722bfb3911976350";

export default node;
