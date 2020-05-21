/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureMeta_feature = {
    readonly name: string;
    readonly slug: string;
    readonly metaDescription: string | null;
    readonly image: {
        readonly url: string | null;
    } | null;
    readonly " $refType": "FeatureMeta_feature";
};
export type FeatureMeta_feature$data = FeatureMeta_feature;
export type FeatureMeta_feature$key = {
    readonly " $data"?: FeatureMeta_feature$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureMeta_feature">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FeatureMeta_feature",
  "type": "Feature",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "metaDescription",
      "name": "description",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "PLAIN"
        }
      ],
      "storageKey": "description(format:\"PLAIN\")"
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
          "kind": "ScalarField",
          "alias": null,
          "name": "url",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "large_rectangle"
            }
          ],
          "storageKey": "url(version:\"large_rectangle\")"
        }
      ]
    }
  ]
};
(node as any).hash = '4d321390b40ead0edce33d296adaa210';
export default node;
