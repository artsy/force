/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneFamily_geneFamily = {
    readonly featuredGeneLinks: ReadonlyArray<{
        readonly href: string;
        readonly title: string;
        readonly image: {
            readonly resized: {
                readonly src: string;
                readonly srcSet: string;
            } | null;
            readonly url: string | null;
        } | null;
    } | null> | null;
    readonly genes: ReadonlyArray<{
        readonly displayName: string | null;
        readonly href: string | null;
        readonly id: string;
        readonly name: string | null;
        readonly slug: string;
    } | null> | null;
    readonly id: string;
    readonly name: string;
    readonly slug: string;
    readonly " $refType": "GeneFamily_geneFamily";
};
export type GeneFamily_geneFamily$data = GeneFamily_geneFamily;
export type GeneFamily_geneFamily$key = {
    readonly " $data"?: GeneFamily_geneFamily$data;
    readonly " $fragmentRefs": FragmentRefs<"GeneFamily_geneFamily">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
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
  "name": "GeneFamily_geneFamily",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FeaturedGeneLink",
      "kind": "LinkedField",
      "name": "featuredGeneLinks",
      "plural": true,
      "selections": [
        (v0/*: any*/),
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
                  "name": "height",
                  "value": 400
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
                  "name": "src",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "srcSet",
                  "storageKey": null
                }
              ],
              "storageKey": "resized(height:400)"
            },
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": "large_rectangle"
                }
              ],
              "kind": "ScalarField",
              "name": "url",
              "storageKey": "url(version:\"large_rectangle\")"
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
      "concreteType": "Gene",
      "kind": "LinkedField",
      "name": "genes",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "displayName",
          "storageKey": null
        },
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/)
      ],
      "storageKey": null
    },
    (v1/*: any*/),
    (v2/*: any*/),
    (v3/*: any*/)
  ],
  "type": "GeneFamily"
};
})();
(node as any).hash = 'c8debec6d37477c020f3f74bac7a0f87';
export default node;
