/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ItemReview_lineItem = {
    readonly artwork: {
        readonly artistNames: string | null;
        readonly title: string | null;
        readonly date: string | null;
        readonly medium: string | null;
        readonly dimensions: {
            readonly in: string | null;
            readonly cm: string | null;
        } | null;
        readonly attribution_class: {
            readonly shortDescription: string | null;
        } | null;
        readonly image: {
            readonly resized: {
                readonly url: string;
            } | null;
        } | null;
        readonly edition_sets: ReadonlyArray<{
            readonly internalID: string;
            readonly dimensions: {
                readonly in: string | null;
                readonly cm: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly editionSetId: string | null;
    readonly " $refType": "ItemReview_lineItem";
};
export type ItemReview_lineItem$data = ItemReview_lineItem;
export type ItemReview_lineItem$key = {
    readonly " $data"?: ItemReview_lineItem$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ItemReview_lineItem">;
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
          "name": "date",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "medium",
          "storageKey": null
        },
        (v0/*: any*/),
        {
          "alias": "attribution_class",
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
        {
          "alias": "edition_sets",
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
      "kind": "ScalarField",
      "name": "editionSetId",
      "storageKey": null
    }
  ],
  "type": "CommerceLineItem",
  "abstractKey": null
};
})();
(node as any).hash = '21a2e52e8eb6eaafb635eaa2a27ed561';
export default node;
