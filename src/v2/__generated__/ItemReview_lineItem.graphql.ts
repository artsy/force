/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ItemReview_lineItem = {
    readonly artwork: {
        readonly artist_names: string | null;
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
                readonly url: string | null;
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
    readonly " $data"?: ItemReview_lineItem$data;
    readonly " $fragmentRefs": FragmentRefs<"ItemReview_lineItem">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "dimensions",
  "storageKey": null,
  "args": null,
  "concreteType": "dimensions",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "in",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "cm",
      "args": null,
      "storageKey": null
    }
  ]
};
return {
  "kind": "Fragment",
  "name": "ItemReview_lineItem",
  "type": "CommerceLineItem",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artwork",
      "storageKey": null,
      "args": null,
      "concreteType": "Artwork",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": "artist_names",
          "name": "artistNames",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "title",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "date",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "medium",
          "args": null,
          "storageKey": null
        },
        (v0/*: any*/),
        {
          "kind": "LinkedField",
          "alias": "attribution_class",
          "name": "attributionClass",
          "storageKey": null,
          "args": null,
          "concreteType": "AttributionClass",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "shortDescription",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "image",
          "storageKey": null,
          "args": null,
          "concreteType": "Image",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "resized",
              "storageKey": "resized(width:185)",
              "args": [
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 185
                }
              ],
              "concreteType": "ResizedImageUrl",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "url",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": "edition_sets",
          "name": "editionSets",
          "storageKey": null,
          "args": null,
          "concreteType": "EditionSet",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "internalID",
              "args": null,
              "storageKey": null
            },
            (v0/*: any*/)
          ]
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "editionSetId",
      "args": null,
      "storageKey": null
    }
  ]
};
})();
(node as any).hash = '1cbb0c8982674f0dcdd9ee38d36fe8cf';
export default node;
