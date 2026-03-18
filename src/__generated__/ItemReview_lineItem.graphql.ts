/**
 * @generated SignedSource<<cdb32880064db7fa699c4508f8bfff11>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ItemReview_lineItem$data = {
  readonly artwork: {
    readonly editionSets: ReadonlyArray<{
      readonly dimensions: {
        readonly cm: string | null | undefined;
        readonly in: string | null | undefined;
      } | null | undefined;
      readonly framedDimensions: {
        readonly cm: string | null | undefined;
        readonly in: string | null | undefined;
      } | null | undefined;
      readonly internalID: string;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly artworkVersion: {
    readonly artistNames: string | null | undefined;
    readonly attributionClass: {
      readonly shortDescription: string | null | undefined;
    } | null | undefined;
    readonly date: string | null | undefined;
    readonly dimensions: {
      readonly cm: string | null | undefined;
      readonly in: string | null | undefined;
    } | null | undefined;
    readonly image: {
      readonly resized: {
        readonly url: string;
      } | null | undefined;
    } | null | undefined;
    readonly medium: string | null | undefined;
    readonly title: string | null | undefined;
  } | null | undefined;
  readonly editionSetId: string | null | undefined;
  readonly " $fragmentType": "ItemReview_lineItem";
};
export type ItemReview_lineItem$key = {
  readonly " $data"?: ItemReview_lineItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"ItemReview_lineItem">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "in",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "cm",
    "storageKey": null
  }
],
v1 = {
  "alias": null,
  "args": null,
  "concreteType": "dimensions",
  "kind": "LinkedField",
  "name": "dimensions",
  "plural": false,
  "selections": (v0/*: any*/),
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ItemReview_lineItem",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Artwork",
      "kind": "LinkedField",
      "name": "artwork",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "EditionSet",
          "kind": "LinkedField",
          "name": "editionSets",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
            },
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "dimensions",
              "kind": "LinkedField",
              "name": "framedDimensions",
              "plural": false,
              "selections": (v0/*: any*/),
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkVersion",
      "kind": "LinkedField",
      "name": "artworkVersion",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "date",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artistNames",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "medium",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "AttributionClass",
          "kind": "LinkedField",
          "name": "attributionClass",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "shortDescription",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "image",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 185
                }
              ],
              "concreteType": "ResizedImageUrl",
              "kind": "LinkedField",
              "name": "resized",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "url",
                  "storageKey": null
                }
              ],
              "storageKey": "resized(width:185)"
            }
          ],
          "storageKey": null
        },
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "editionSetId",
      "storageKey": null
    }
  ],
  "type": "CommerceLineItem",
  "abstractKey": null
};
})();

(node as any).hash = "f4cfb1dc0725fcb6853149f5b9df5fb2";

export default node;
