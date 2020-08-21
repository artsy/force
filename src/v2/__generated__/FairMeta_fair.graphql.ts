/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairMeta_fair = {
    readonly name: string | null;
    readonly slug: string;
    readonly metaDescription: string | null;
    readonly metaImage: {
        readonly src: string | null;
    } | null;
    readonly " $refType": "FairMeta_fair";
};
export type FairMeta_fair$data = FairMeta_fair;
export type FairMeta_fair$key = {
    readonly " $data"?: FairMeta_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairMeta_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairMeta_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "metaDescription",
      "args": null,
      "kind": "ScalarField",
      "name": "summary",
      "storageKey": null
    },
    {
      "alias": "metaImage",
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": "src",
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
  "type": "Fair"
};
(node as any).hash = 'df70e523e990f462efe34ddf4770162c';
export default node;
