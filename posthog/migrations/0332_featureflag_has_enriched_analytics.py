# Generated by Django 3.2.18 on 2023-06-22 11:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("posthog", "0331_add_missing_property_definition_index"),
    ]

    operations = [
        migrations.AddField(
            model_name="featureflag",
            name="has_enriched_analytics",
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
