/**
 * @generated SignedSource<<af7bf69c3112dfcf433c3479fc67ca38>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ItemReview_lineItem$data = {
  readonly artwork: {
    readonly editionSets: ReadonlyArray<{
      readonly dimensions: {
        readonly cm: string | null;
        readonly in: string | null;
      } | null;
      readonly internalID: string;
    } | null> | null;
  } | null;
  readonly artworkVersion: {
    readonly artistNames: string | null;
    readonly attributionClass: {
      readonly shortDescription: string | null;
    } | null;
    readonly date: string | null;
    readonly dimensions: {
      readonly cm: string | null;
      readonly in: string | null;
    } | null;
    readonly image: {
      readonly resized: {
        readonly url: string;
      } | null;
    } | null;
    readonly medium: string | null;
    readonly title: string | null;
  } | null;
  readonly editionSetId: string | null;
  readonly " $fragmentType": "ItemReview_lineItem";
};
export type ItemReview_lineItem$key = {
  readonly " $data"?: ItemReview_lineItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"ItemReview_lineItem">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "concreteType": "dimensions",
  "kind": "LinkedField",
  "name": "dimensions",
  "plural": false,
  "selections": [
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
            (v0/*: any*/)
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
        (v0/*: any*/)
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

(node as any).hash = "1a3fe10edfce0207b339f3dd75c77079";

export default node;
